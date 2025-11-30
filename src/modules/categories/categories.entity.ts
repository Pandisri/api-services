import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity('categories')
export class Categories {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    slug: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

}