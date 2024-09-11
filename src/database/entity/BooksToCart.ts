import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Book } from "./Book"
import { Cart } from "./Cart"

@Entity()
export class BooksToCart {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    booksCount: number

    @ManyToOne(() => Book, (book) => book.booksToCart)
    book: Book

    @ManyToOne(() => Cart, (cart) => cart.booksToCart)
    cart: Cart
}