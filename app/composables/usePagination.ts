// composables/usePagination.ts
export const usePagination = (
    props: { totalPages: number, modelValue: number },
    emit: {
        (e: 'update:modelValue', value: number): void
    }
) => {

    const pageNumbers = computed(() => {
        const { totalPages } = props;
        const current = props.modelValue;
        const maxVisible = 5;

        if (totalPages <= maxVisible) return Array.from({ length: totalPages }, (_, i) => (i + 1).toString());

        const pages: (string | '...')[] = ['1'];

        if (current > 3) pages.push('...');
        
        const start = Math.max(2, current - 2);
        const end = Math.min(totalPages - 1, current + 2);
        for (let i = start; i <= end; i++) {
            pages.push(i.toString());
        }

        if (current < totalPages - 2) pages.push('...');
        pages.push(totalPages.toString());

        return pages;
    });

    const goToPage = (page: string | '...') => {
        if (page === '...') return;
        const pageNum = parseInt(page);
        if (isNaN(pageNum) || pageNum < 1 || pageNum > props.totalPages) return;
        emit('update:modelValue', pageNum);
    };

    return {
        pageNumbers,
        goToPage
    };

};