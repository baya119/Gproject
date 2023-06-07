from rest_framework import serializers
from .models import PaymentHistory

class DepositSerializer(serializers.Serializer):
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    currency = serializers.CharField()


    def save(self, user):
        amount = self.validated_data['amount']
        currency = self.validated_data['currency']
        instance = PaymentHistory(user=user, amount=amount, currency=currency, payment_type="deposit")
        return instance

