from django.contrib.auth.models import User
from django.db import models


class Customer(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    street = models.CharField(max_length=100, null=True)
    street_number = models.CharField(max_length=10, null=True)
    city = models.CharField(max_length=100, null=True)
    country = models.CharField(max_length=100, null=True)
    postal_code = models.CharField(max_length=10, null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)


product_categories = [
    ('pc_component', 'PC Components'),
    ('pc', 'Computers and Laptops'),
    ('tv', 'Television'),
    ('peripherals', 'Peripherals')
]

inventory_statuses = [
    ('INSTOCK', 'In stock'),
    ('OUTOFSTOCK', 'Out of stock'),
    ('LOWSTOCK', 'Low stock'),
]


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(null=True)
    image = models.ImageField(upload_to='images/', null=True)
    price = models.DecimalField(max_digits=6, decimal_places=2, null=True)
    category = models.CharField(choices=product_categories, max_length=100, null=True)
    rating = models.IntegerField(default=0)
    inventory_status = models.CharField(choices=inventory_statuses, max_length=100, default='INSTOCK')


order_statuses = [('pending', 'Pending'), ('delivered', 'Delivered'), ('cancelled', 'Cancelled')]


class Order(models.Model):
    id = models.AutoField(primary_key=True)
    number = models.DecimalField(decimal_places=0, max_digits=20, unique=True)
    status = models.CharField(choices=order_statuses, max_length=100)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product, related_name='orders')




