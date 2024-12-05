const StoreData = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log('ERROR: Storage.StoreData: - ' + error);
    }
};

const RetrieveData = (key) => {
    return new Promise((resolve, reject) => {
        try {
            const result = localStorage.getItem(key);
            if (result) {
                try {
                    resolve(JSON.parse(result));
                } catch (error) {
                    resolve(result); // In case the stored value is not JSON
                }
            } else {
                resolve(null); // If key doesn't exist in localStorage
            }
        } catch (error) {
            console.log('ERROR: Storage.RetrieveData: - ' + error);
            reject(error);
        }
    });
};

const RemoveStoredData = (key) => {
    try {
        localStorage.removeItem(key);
        console.log('REMOVED: ITEM FOR KEY : ', key);
    } catch (error) {
        console.log('ERROR: Storage.RemoveStoredData: - ' + error);
    }
};

const ClearAllStoredData = () => {
    try {
        localStorage.clear(); // This clears all keys in localStorage
        console.log('ALL ITEMS CLEARED');
    } catch (error) {
        console.log('ERROR: Storage.ClearAllStoredData: - ' + error);
    }
};

export { StoreData, RetrieveData, RemoveStoredData, ClearAllStoredData };
