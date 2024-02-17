import Stripe from 'stripe'; // 引入 stripe 套件 里面有很多类型定义

export interface Song {
    id: string; // 歌曲 ID
    user_id: string; // 用户 ID
    author: string; // 作者
    title: string; // 标题
    song_path: string; // 歌曲路径
    image_path: string; // 图片路径
}

export interface Product {
    id: string; // 产品 ID
    active?: boolean; // 是否激活
    name?: string; // 名称
    description?: string; // 描述
    image?: string; // 图片
    metadata?: Stripe.Metadata; // 元数据
}

export interface Price {
    id: string; // 价格 ID
    product_id?: string; // 产品 ID
    active?: boolean; // 是否激活
    description?: string; // 描述
    unit_amount?: number; // 单价
    currency?: string; // 货币
    type?: Stripe.Price.Type; // 类型
    interval?: Stripe.Price.Recurring.Interval; // 间隔
    interval_count?: number; // 间隔数量
    trial_period_days?: number | null; // 试用期天数
    metadata?: Stripe.Metadata; // 元数据
    products?: Product; // 产品
}

export interface Customer {
    id: string; // 客户 ID
    stripe_customer_id?: string; // Stripe 客户 ID
}

export interface UserDetails {
    id: string; // 用户详情 ID
    first_name: string; // 名字
    last_name: string; // 姓氏
    full_name?: string; // 全名
    avatar_url?: string; // 头像 URL
    billing_address?: Stripe.Address; // 账单地址
    payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type]; // 支付方式
}

export interface ProductWithPrice extends Product {
    prices?: Price[]; // 价格列表
}

export interface Subscription {
    id: string; // 订阅 ID
    user_id: string; // 用户 ID
    status?: Stripe.Subscription.Status; // 状态
    metadata?: Stripe.Metadata; // 元数据
    price_id?: string; // 价格 ID
    quantity?: number; // 数量
    cancel_at_period_end?: boolean; // 是否在周期结束时取消
    created: string; // 创建时间
    current_period_start: string; // 当前周期开始时间
    current_period_end: string; // 当前周期结束时间
    ended_at?: string; // 结束时间
    cancel_at?: string; // 取消时间
    canceled_at?: string; // 已取消时间
    trial_start?: string; // 试用开始时间
    trial_end?: string; // 试用结束时间
    prices?: Price; // 价格
}