"""
URL configuration for auth app.
"""

from django.urls import path
from django.contrib.auth.decorators import login_required
from .views import *

urlpatterns = [
   path('signup/', signup, name='signup'),
   path('login/', login, name='login'),
   path('user/', login_required(user_details), name='user'),
   path('logout/', logout_view, name='logout'),

]
