import { IsEmail, Length } from "class-validator";
import { Entity as TOEntity, Column, Index, BeforeInsert, ManyToOne, JoinColumn } from "typeorm";
import bcrypt from "bcrypt";
import { Exclude } from "class-transformer";

import Entity from "./Entity";
import User from "./User";
@TOEntity("posts")
export default class Post extends Entity{
    constructor(post: Partial<Post>){
        super()
        Object.assign(this, Post)
    }

    @Index()
    @Column()
    identifier: string // 7 character Id

    @Column()
    title: string

    @Index()
    @Column()
    slug: string

    @Column({nullable: true, type: 'text'})
    body: string

    @Column()
    subName: string

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({name: 'username', referencedColumnName: 'username'})
    user: User;
}
