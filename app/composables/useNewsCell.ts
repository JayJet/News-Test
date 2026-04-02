// composables/useNewsCell.ts
import { computed } from 'vue';
import type { INewsItem } from '~/types/news';
import NoPic from '~/assets/no_pic.jpg'

export const useNewsCell = (
    props: { item: INewsItem }
) => {

    interface Domain {
        link: string;
        title: string;
    }

    const imageSrc = computed<string>(() => {
        return props.item.images?.[0] || '';
    });

    const domain = computed<Domain>(() => {
        try {
            const url = new URL(props.item.link);
            const hostname = url.hostname;
            return {
                link: `https://${hostname}`,
                title: hostname
            };
        } catch (error) {
            return {
                link: '/',
                title: ''
            };
        }
    });

    const date = computed<string>(() => {
        return new Date(props.item.pubDate).toLocaleDateString('ru');
    });

    const onClick = () => {
        window.open(props.item.link, '_blank');
    };

    const onImageError = (event: Event) => {
        const target = event.target as HTMLImageElement;
        if (target.src !== NoPic) {
            target.src = NoPic
        }
    };

    return {
        date,
        domain,
        imageSrc,
        onClick,
        onImageError
    };

};