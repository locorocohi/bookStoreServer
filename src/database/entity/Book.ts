import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany } from "typeorm"
import { Comment } from "./Comment"
import { BooksToCart } from "./BooksToCart"
import { User } from "./User"

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

    @OneToMany(() => BooksToCart, (booksToCart) => booksToCart.book)
    booksToCart: BooksToCart[]

    @ManyToMany(() => User, (user) => user.favorites)
    users: User []
}