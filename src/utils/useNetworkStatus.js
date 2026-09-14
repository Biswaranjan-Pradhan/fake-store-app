import { useEffect, useState } from "react";

const useNetworkStatus = () => {

    const [networkStaus, setNetworkStaus] = useState(false);

    useEffect(() => {
        fetchNetworkStatus();
    }, []);

    const fetchNetworkStatus = () => {
        window.addEventListener('offline', () => {
            setNetworkStaus(true);
        });

        window.addEventListener('online', () => {
            setNetworkStaus(false);
        });
    }

    return networkStaus;
}

export default useNetworkStatus;