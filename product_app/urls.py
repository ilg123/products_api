from django.urls import path
from .views import ProductListCreateView, index
from rest_framework import routers


urlpatterns = [
    path('api/products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('', index, name='index'),
]
