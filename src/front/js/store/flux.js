import axios from "axios";

const getState = ({
    getStore,
    getActions,
    setStore
}) => {
    return {
        store: {
            product: [],
            productDetail: {},
            products: [],

            listaFavoritos: [],
            // listaCarrito: [],

            auth: false,
            registered: false,
        },
        actions: {
            // fecht de los cuadros
            getProduct: async () => {
                try {
                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/product"
                    ); //ir a buscar
                    const data = await response.json();
                    console.log(data);
                    setStore({
                        product: data,
                    }); //promesa 2
                } catch (err) {
                    console.log(err);
                }

                // fecht de los detalles
            },
            // funcion para obtener detalles de los cuadros
            getProductDetail: async (id) => {
                try {
                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/product/" + id
                    );
                    const data = await response.json();
                    console.log(data);

                    setStore({
                        productDetail: data,
                    });
                } catch (err) {
                    console.log(err);
                }
            },
            // funcion para Login
            login: async (email, password) => {
                try {
                    const response = await axios.post(
                        process.env.BACKEND_URL + "/api/login", {
                            email: email,
                            password: password,
                        }
                    );

                    localStorage.setItem("token", response.data.msg);
                    console.log(response.data.msg);
                    console.log(response);
                    setStore({
                        auth: true,
                    });
                    return true;
                } catch (error) {
                    console.log(error);
                    if (error.code === "ERR_BAD_REQUEST") {
                        alert(error.response.data.msg);
                    }
                }
            },

            // logout

            logout: () => {
                localStorage.removeItem("token");
                setStore({
                    auth: false,
                });
                return false;
            },
            addProducts: (product) => {
                const store = getStore();
                if (store.products.includes(product)) {
                    getActions().removeProduct(product);
                } else {
                    setStore({
                        products: [...store.products, product],
                    });
                }
            },
            removeProduct: (product) => {
                const store = getStore();
                setStore({
                    products: store.products.filter((item) => item !== product),
                });
            },
            // constante marcar favoritos
            marcarFavoritos: (favorito) => {
                let store = getStore();
                if (store.listaFavoritos.includes(favorito)) {
                    getActions().eliminarFavoritos(favorito);
                } else {
                    setStore({
                        listaFavoritos: [...store.listaFavoritos, favorito],
                    });
                }
            },

            createFavorite: async (product_id, user_id) => {
                try {
                    const response = await axios.post(
                        process.env.BACKEND_URL + "/api/user/id/favorite", {
                            product_id: product_id,
                            user_id: user_id
                        }
                    );
                    getActions().marcarFavoritos(product_id)
                } catch (error) {
                    console.log(error);
                }
            },

            // constante eliminar favoritos
            eliminarFavoritos: (favorito) => {
                let store = getStore();
                setStore({
                    listaFavoritos: store.listaFavoritos.filter(
                        (item) => item !== favorito
                    ),
                });
            },

            // funcion para crear productos

            createProduct: async (name, description, category, url, price) => {
                try {
                    const response = await axios.post(
                        process.env.BACKEND_URL + "/api/product", {
                            name: name,
                            description: description,
                            category: category,
                            url: url,
                            price: price,
                        }
                    );
                } catch (error) {
                    console.log(error);
                }
            },

            signup: async (username, email, password) => {
                try {
                    const response = await axios.post(
                        process.env.BACKEND_URL + "/api/user", {
                            username: username,
                            email: email,
                            password: password,
                        }
                    );

                    if (response.status === 200) {
                        getActions().login(email, password);
                        setStore({
                            registered: true,
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            },

            //Funcion para validar el Token y mantener al usuario registrado

            validToken: async () => {
                let accessToken = localStorage.getItem("token");
                try {
                    const response = await axios.get(
                        process.env.BACKEND_URL + "/api/valid-token", {
                            headers: {
                                Authorization: "Bearer " + accessToken,
                            },
                        }
                    );
                    console.log(accessToken);

                    setStore({
                        auth: response.data.status,
                    });
                    console.log(auth);
                    return;
                } catch (error) {
                    // console.log(error);
                    if (error.code === "ERR_BAD_REQUEST") {
                        setStore({
                            auth: false,
                        });
                    }
                    return false;
                }
            },
        },
    };
};

export default getState;