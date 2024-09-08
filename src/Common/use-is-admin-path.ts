import {useLocation} from 'react-router-dom';

function useIsAdminPath() {

    const location = useLocation();

    return location.pathname.includes('admin');
}

export { useIsAdminPath };