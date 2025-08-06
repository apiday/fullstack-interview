from rest_framework import serializers
from .models import Campaign, CampaignTarget

class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = '__all__'

class CampaignTargetSerializer(serializers.Serializer):
    company_ids = serializers.ListField(child=serializers.IntegerField())