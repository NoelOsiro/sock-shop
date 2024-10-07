import React from 'react';
import Head from 'next/head';
import { Metadata, ResolvingMetadata } from 'next';
import { getProductBySlug } from '@/lib/api';
import { urlFor } from '@/sanity/lib/client';

export async function generateMetadata(
    { params }: { params: { slug: string } },
    parent: ResolvingMetadata): Promise<Metadata> {
    const fetchedProduct = await getProductBySlug(params.slug);
    const previousImages = (await parent).openGraph?.images ?? [];
    const title = fetchedProduct ? fetchedProduct.title : 'Product Not Found';
    const description = fetchedProduct ? fetchedProduct.description : 'Product not found';
    const imageUrl = fetchedProduct ? urlFor(fetchedProduct.imageUrl).url() : '';

    return {
        title: title,
        description: description,
        openGraph: {
            images: [imageUrl, ...previousImages],
        },
    };
}

interface LayoutProps {
    children: React.ReactNode;

}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col md:flex-row gap-8">
            {children}
        </div>
    );
};

export default Layout;