import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { Comment } from "./Comment"
import { BooksToCart } from "./BooksToCart"

@Entity()
export class Book {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    cover: string

    @Column()
    author: string

    @Column()
    name: string

    @Column()
    genre: string

    @Column({type: 'float'})
    rating: number

    @Column({type: 'float'})
    price: number

    @Column()
    available: boolean

    @Column()
    description: string

    @OneToMany(() => Comment, (coment) => coment.book, {
        onDelete: 'CASCADE'
    })
    comments: Comment[]

    @OneToMany(() => BooksToCart, (booksToCart) => booksToCart.books)
    booksToCart: BooksToCart[]
}