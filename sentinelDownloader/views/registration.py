from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect


def create_superuser():
    username = 'admin'
    password = '123admin123'
    # email = ''

    if User.objects.filter(username=username).count() == 0:
        User.objects.create_superuser(username=username, password=password, email="entella@rambler.ru")  # email
        print('Superuser created.')
    else:
        print('Superuser creation skipped.')
    return


def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('../')  # need ro redirect to root
    else:
        form = UserCreationForm()
    return render(request, 'registration/signup.html', {'form': form})