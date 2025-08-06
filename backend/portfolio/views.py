from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import Fund, Company
from .serializers import FundSerializer, CompanySerializer


class FundViewSet(viewsets.ModelViewSet):
    queryset = Fund.objects.all()
    serializer_class = FundSerializer

    @action(
        detail=True, methods=["get"], url_path="companies", url_name="list_companies"
    )
    def list_companies(self, request, pk=None):
        fund = self.get_object()
        companies = fund.companies.all()
        serializer = CompanySerializer(companies, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["post"], url_path="create-company")
    def create_company(self, request, pk=None):
        fund = self.get_object()
        request.data["fund"] = fund.id
        serializer = CompanySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

    def get_queryset(self):
        queryset = Company.objects.all()
        fund_id = self.request.query_params.get("fund_id")
        sector = self.request.query_params.get("sector")
        q = self.request.query_params.get("q")

        if fund_id:
            queryset = queryset.filter(fund_id=fund_id)
        if sector:
            queryset = queryset.filter(sector=sector)
        if q:
            queryset = queryset.filter(Q(name__icontains=q) | Q(sector__icontains=q))

        return queryset
