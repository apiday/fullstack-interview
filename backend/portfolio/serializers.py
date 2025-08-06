from rest_framework import serializers
from .models import Fund, Company

class FundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fund
        fields = '__all__'

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'