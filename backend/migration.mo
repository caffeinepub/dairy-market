import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import List "mo:core/List";

module {
  type OldProduct = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    imageUrl : Text;
  };

  type OldCartItem = {
    product : OldProduct;
    quantity : Nat;
  };

  type OldActor = {
    nextProductId : Nat;
    products : Map.Map<Nat, OldProduct>;
    carts : Map.Map<Principal, List.List<OldCartItem>>;
  };

  type Size = {
    name : Text;
    available : Bool;
  };

  type NewProduct = {
    id : Nat;
    name : Text;
    description : Text;
    brand : Text;
    category : Text;
    price : Float;
    originalPrice : ?Float;
    imageUrl : Text;
    sizes : [Size];
    rating : Float;
  };

  type NewCartItem = {
    product : NewProduct;
    quantity : Nat;
    selectedSize : Text;
  };

  type NewActor = {
    nextProductId : Nat;
    products : Map.Map<Nat, NewProduct>;
    carts : Map.Map<Principal, List.List<NewCartItem>>;
  };

  public func run(old : OldActor) : NewActor {
    let newProducts = old.products.map<Nat, OldProduct, NewProduct>(
      func(_id, oldProduct) {
        {
          id = oldProduct.id;
          name = oldProduct.name;
          description = oldProduct.description;
          brand = "Unknown";
          category = "Unknown";
          price = oldProduct.price.toFloat();
          originalPrice = null;
          imageUrl = oldProduct.imageUrl;
          sizes = [];
          rating = 0.0;
        };
      }
    );

    let newCarts = old.carts.map<Principal, List.List<OldCartItem>, List.List<NewCartItem>>(
      func(_principal, oldCart) {
        oldCart.map<OldCartItem, NewCartItem>(
          func(oldCartItem) {
            {
              product = {
                id = oldCartItem.product.id;
                name = oldCartItem.product.name;
                description = oldCartItem.product.description;
                brand = "Unknown";
                category = "Unknown";
                price = oldCartItem.product.price.toFloat();
                originalPrice = null;
                imageUrl = oldCartItem.product.imageUrl;
                sizes = [];
                rating = 0.0;
              };
              quantity = oldCartItem.quantity;
              selectedSize = "";
            };
          }
        );
      }
    );

    {
      nextProductId = old.nextProductId;
      products = newProducts;
      carts = newCarts;
    };
  };
};
