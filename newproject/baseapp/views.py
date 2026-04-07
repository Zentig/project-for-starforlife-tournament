from django.shortcuts import render

def auth_page(request):
    return render(request, 'baseapp/auth_page.html')