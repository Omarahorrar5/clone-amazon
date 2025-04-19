import {formatCurrency} from "../scripts/utils/money.js";

class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id=productDetails.id;
    this.image=productDetails.image;
    this.name=productDetails.name;
    this.rating=productDetails.rating;
    this.priceCents=productDetails.priceCents;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }
}



export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
      if (product.id===productId) {
          matchingProduct=product
      }
  });

  return matchingProduct
}


export let products = [];

export function loadProducts(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    products=JSON.parse(xhr.response).map((productDetails) => {
      return new Product(productDetails)
    });

    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}