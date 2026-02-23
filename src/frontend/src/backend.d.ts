import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: bigint;
    name: string;
    description: string;
    imageUrl: string;
    price: bigint;
}
export interface CartItem {
    quantity: bigint;
    product: Product;
}
export interface backendInterface {
    addProduct(name: string, description: string, price: bigint, imageUrl: string): Promise<void>;
    addToCart(productId: bigint, quantity: bigint): Promise<void>;
    checkout(): Promise<void>;
    clearCart(): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getCart(): Promise<Array<CartItem>>;
    getCartTotal(): Promise<bigint>;
    removeFromCart(productId: bigint): Promise<void>;
}
