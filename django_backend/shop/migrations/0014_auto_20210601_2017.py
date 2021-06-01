# Generated by Django 3.2 on 2021-06-01 18:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0013_alter_product_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='email',
            field=models.EmailField(max_length=100),
        ),
        migrations.AlterField(
            model_name='order',
            name='number',
            field=models.DecimalField(decimal_places=0, max_digits=20, unique=True),
        ),
    ]
