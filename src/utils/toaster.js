import { toast } from 'react-semantic-toasts';

export const make = (type, title, description) => {
    setTimeout(() => { 
        toast({
            type: type,
            title: title,
            description: description
        });
    }, 100);
}