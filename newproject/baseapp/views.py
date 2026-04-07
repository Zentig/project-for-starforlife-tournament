from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import User

def auth_page(request):
    if request.method == 'POST':
        action = request.POST.get('action')
        
        if action == 'register':
            username = request.POST.get('username')
            email = request.POST.get('email')
            password = request.POST.get('password')
            
            if User.objects.filter(username=username).exists():
                messages.error(request, "Username already exists.")
            elif User.objects.filter(email=email).exists():
                messages.error(request, "Email already registered.")
            else:
                user = User.objects.create_user(username=username, email=email, password=password)
                login(request, user)
                return redirect('dashboard')
                
        elif action == 'login':
            identifier = request.POST.get('identifier')
            password = request.POST.get('password')
            
            user = authenticate(request, username=identifier, password=password)
            if user is None:
                try:
                    user_obj = User.objects.get(email=identifier)
                    user = authenticate(request, username=user_obj.username, password=password)
                except User.DoesNotExist:
                    pass
            
            if user is not None:
                login(request, user)
                return redirect('dashboard')
            else:
                messages.error(request, "Invalid credentials.")
                
        elif action == 'forgot':
            messages.info(request, "Recovery link sent to your email.")
            
    return render(request, 'baseapp/auth_page.html')

@login_required(login_url='/')
def dashboard(request):
    return render(request, 'baseapp/dashboard.html')