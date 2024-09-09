import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
import { BooksToCart } from "./BooksToCart"

@Entity()
export class Cart {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'float'})
    total: number

    @OneToOne((() => User), (user) => user.cart)
    user: User
    
    @OneToMany((()=> BooksToCart), (booksToCart) => booksToCart.cart)
    booksToCart: BooksToCart[]
  }
