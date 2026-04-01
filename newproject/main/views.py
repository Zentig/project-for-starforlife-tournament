from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    return render(request, 'main/index.html',
                  {"title": "Головна сторінка"})

def about(request):
    return render(request, 'main/about.html')