from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Campaign
from .serializers import CampaignSerializer


class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer

    @action(detail=True, methods=["get"], url_path="targets")
    def list_targets(self, request, pk=None):
        campaign = self.get_object()
        company_ids = campaign.targets.values_list("company_id", flat=True)
        return Response({"company_ids": list(company_ids)})
