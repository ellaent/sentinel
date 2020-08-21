"""sentinelDownloader URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from sentinelDownloader.views.downloader import find_urls, geojson_handler
from django.views.generic import TemplateView
from django.conf.urls import include, url
from downloader import indexview
from registration import signup
from django.shortcuts import redirect
from sentinelDownloader.views.registration import create_superuser
from django.views.generic.base import RedirectView
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('django.contrib.auth.urls')),
    path('home/', indexview, name='home'),
    path('home/get_geo', geojson_handler, name='geojson_handler'),
    # path('data-table/', TemplateView.as_view(template_name="data_table.html"), name='data_table'),
    path('home/findurls', find_urls, name='home'),
    # path('registration', TemplateView.as_view(template_name='registration/signup.html'), name='home'),
    url(r'^.*signup/$', signup, name='signup'),
    url('', RedirectView.as_view(url="/home/", permanent=False)),
]
print(urlpatterns)
