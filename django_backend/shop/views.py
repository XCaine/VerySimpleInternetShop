from django.contrib.auth.models import User
from django.db.models import Q
from django.http import HttpResponse
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.decorators import action

from shop.models import Customer, Order, Product
from shop.serializers import CustomerSerializer, ProductSerializer, OrderSerializer, UserSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['username']


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = []


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = []


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = []

    @action(detail=True)
    def get_image(self, request, *args, **kwargs):
        image = Product.objects.get(id=1).image
        return HttpResponse(image, content_type="image/png")

    @action(detail=True, methods=['get'])
    def get_filtered_products(self, request, *args, **kwargs):
        test_filter = "test"
        filtered_products = self.get_object().filter(Q(description__contains=test_filter) | Q(name__contains=test_filter))
        #search_value = request.GET.get('search_value')

        #filtered_products = Product.objects.filter(Q(description__contains=test_filter) | Q(name__contains=test_filter))
        product_serializer = self.serializer_class(filtered_products, many=True) #ProductSerializer(filtered_products, many=True)
        return HttpResponse(product_serializer.data, safe=False)