from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .utils import recieve_money
from rest_framework import authentication, permissions
from .serializers import DepositSerializer
from rest_framework import status

# Create your views here.
class Deposit(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        serializer = DepositSerializer(data=request.data)
        if serializer.is_valid():
            transaction = serializer.save(request.user)
            data = serializer.data
            data["tx_ref"] = str(transaction.id)
            data["callback_url"] = "http://127.0.0.1:8000/api/payment-success/"
            data["return_url"] = "http://localhost:3000/payment-success/"
            response = recieve_money(data)
            if response:
                transaction.save()
                return Response({'redirect_url': response["data"]["checkout_url"]}, status=status.HTTP_200_OK)
            

        return Response(status=status.HTTP_400_BAD_REQUEST)


class Buy(APIView):
    pass


class Cpo(APIView):
    pass

class PaymentSuccess(APIView):
    def get(self, request, format=None):
        print("success")


        

                
            




