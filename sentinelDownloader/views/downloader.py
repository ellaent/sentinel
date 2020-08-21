# from sentinelDownloader.views.account import Authorization
from sentinelsat import SentinelAPI, read_geojson, geojson_to_wkt
from django.shortcuts import render, render_to_response
import json
from django.views.decorators.csrf import csrf_exempt
from collections import OrderedDict
from django.http import HttpResponse, HttpRequest
from django.views.generic import TemplateView
from registration import create_superuser
from shapely.geometry import shape
import urllib.request
import urllib.error


class DataProcessing:
    Data = dict()
    urls = []
    footprint = None


user_data = DataProcessing()
api = SentinelAPI('djangoadmin', '123admin123', 'https://scihub.copernicus.eu/dhus')


def indexview(request):
    create_superuser()

    return render(request,
                  template_name='index.html')


def get_all_data(request): #geojson_obj):
    if request.is_ajax():
        if request.method == 'GET':
            print('GOT REQUEST')
            data = dict()
            json_data = json.dumps(request.GET)
            json_data = json.loads(json_data)
            data['date'] = (json_data['beginposition'].replace('-', ''), json_data['endposition'].replace('-', ''))
            data['cloudcoverpercentage'] = (0, int(json_data['cloudcoverpercentage']))
            user_data.Data = OrderedDict(data)
    return user_data.Data

@csrf_exempt
def geojson_handler(request):
    if request.is_ajax() and request.method == 'POST':
        polygon_data = json.loads(request.FILES.get('geojson_data').file.read().decode('UTF-8'))
        coordinates = polygon_data.get('features')[0]['geometry']['coordinates']
        if coordinates:
            user_data.footprint = geojson_to_wkt(dict(polygon_data))
            print(user_data.footprint)
            return HttpResponse('OK')
    return HttpResponse("Couldn't load data")


def map_handler(request):
    if request.is_ajax() and request.method == 'GET':
        coordinates = dict(request.GET)['coordinates']
        for i in range(len(coordinates)):
            coordinates[i] = list(coordinates[i])
        new_arr = list()
        new_arr.append(coordinates[:])
        geo = {
            "coordinates": new_arr,
            "type": "Polygon"
        }
        geom = shape(geo)
        user_data.footprint = geom.wkt
        HttpResponse('OK')
    HttpResponse("Couldn't load data")


def find_urls(request, *geojson_obj):  # need to add conditional with geojson and footprint
    """
    Counts urls by filters

    :param request:
    JSON object with filters
    :return:
    Response with urls
    """
    user_query = get_all_data(request)
    user_data.urls.clear()
    if api:
        products = api.query(user_data.footprint, **user_query)
        product_ids = list(products)
        for id in product_ids:
            user_data.urls.append(api.get_product_odata(id)['url'])
        user_data.urls = set(user_data.urls)
        user_data.urls = list(user_data.urls)
        print('OK ', len(user_data.urls))
        # count = str(len(user_data.urls))
    else:
        HttpResponse('False')
    return HttpResponse(json.dumps({'urls': user_data.urls}), content_type="application/json")