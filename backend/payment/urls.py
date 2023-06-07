from django.urls import path, re_path
from . import views

urlpatterns = [
    path('deposit/', views.Deposit.as_view(), name="deposit"),
    path('buy-document/', views.Buy.as_view(), name="buy document"),
    path('cpo/', views.Cpo.as_view(), name="cpo"),
    path('payment-success/', views.PaymentSuccess.as_view())
]