import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinColumn, JoinTable, OneToOne } from "typeorm"
import { Comment } from "./Comment"
import { Book } from "./Book"
import { Cart } from "./Cart"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    avatar: string

    @Column()
    name: string

    @OneToOne(() => Cart, (cart) => cart.user)
    @JoinColumn()
    cart: Cart

    @OneToMany(() => Comment, (comment) => comment.author, { cascade: true })
    comments: Comment[]

    @ManyToMany(() => Book, (book) => book.users, {cascade: true})
    @JoinTable()
    favorites: Book []
}
