import React, { useState, useEffect } from 'react';

interface Spec {
    label: string;
    value: string;
}

interface Product {
    id: number;
    name: string;
    category: string;
    price: string;
    description: string;
    long_description: string;
    image: string;
    features: string[];
    specifications: Spec[];
    deleted?: boolean;
}

export const AdminDashboard = () => {
    // Auth-States
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Formular-States
    const [editId, setEditId] = useState<number | null>(null);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Küchenmesser');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [longDesc, setLongDesc] = useState('');
    const [folderName, setFolderName] = useState('');
    const [features, setFeatures] = useState('');
    const [specs, setSpecs] = useState<Spec[]>([{ label: '', value: '' }]);
    
    const [mainFile, setMainFile] = useState<File | null>(null);
    const [galleryFiles, setGalleryFiles] = useState<FileList | null>(null);

    // Produktliste-States
    const [products, setProducts] = useState<Product[]>([]);
    const [trash, setTrash] = useState<Product[]>([]);
    const [showTrash, setShowTrash] = useState(false);

    const API_BASE = 'https://messerschmiede-schwaiger.at/api';

    // Check Auth beim Start
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            fetchProducts();
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok && data.token) {
                localStorage.setItem('token', data.token);
                setIsAuthenticated(true);
                fetchProducts();
            } else {
                alert("Anmeldung fehlgeschlagen!");
            }
        } catch (err) {
            alert("Login-Fehler!");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setProducts([]);
        setTrash([]);
    };

    const fetchProducts = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${API_BASE}/products`);
            const data = await res.json();
            setProducts(data);

            const trashRes = await fetch(`${API_BASE}/trash`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (trashRes.status === 401) {
                handleLogout();
                return;
            }
            
            const trashData = await trashRes.json();
            setTrash(trashData);
        } catch (err) {
            console.error("Fehler beim Laden:", err);
        }
    };

    const handleEdit = (p: Product) => {
        setEditId(p.id);
        setName(p.name);
        setCategory(p.category);
        setPrice(p.price);
        setDesc(p.description);
        setLongDesc(p.long_description);
        setFolderName(p.image);
        setFeatures(Array.isArray(p.features) ? p.features.join(', ') : '');
        setSpecs(p.specifications || [{ label: '', value: '' }]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: number) => {
        if (!confirm("In den Papierkorb verschieben?")) return;
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${API_BASE}/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchProducts();
        } catch (err) {
            alert("Fehler beim Löschen");
        }
    };

    const handleRestore = async (id: number) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${API_BASE}/products/${id}/restore`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchProducts();
        } catch (err) {
            alert("Fehler beim Wiederherstellen");
        }
    };

    const handleHardDelete = async (id: number) => {
        if (!confirm("WARNUNG: Löscht das Messer und alle Bilder UNWIDERRUFLICH!")) return;
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${API_BASE}/products/${id}/hard`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchProducts();
        } catch (err) {
            alert("Fehler beim endgültigen Löschen");
        }
    };

    const addSpec = () => setSpecs([...specs, { label: '', value: '' }]);
    const updateSpec = (index: number, field: 'label' | 'value', val: string) => {
        const newSpecs = [...specs];
        newSpecs[index][field] = val;
        setSpecs(newSpecs);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();

        formData.append('name', name);
        formData.append('category', category);
        formData.append('price', price.toString());
        formData.append('description', desc || '');
        formData.append('long_description', longDesc || '');
        formData.append('image', folderName);

        const featuresArray = typeof features === 'string' 
            ? features.split(',').map(f => f.trim()).filter(f => f !== "")
            : features;
        
        formData.append('features', JSON.stringify(featuresArray));
        formData.append('specifications', JSON.stringify(specs));

        if (mainFile) formData.append('mainImage', mainFile);
        if (galleryFiles) {
            Array.from(galleryFiles).forEach((file) => formData.append('gallery', file));
        }

        const url = editId ? `${API_BASE}/products/${editId}` : `${API_BASE}/products`;
        const method = editId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            if (response.ok) {
                alert("Erfolgreich gespeichert!");
                setEditId(null);
                setName(''); setPrice(''); setFolderName(''); setDesc(''); setLongDesc(''); setFeatures('');
                setSpecs([{ label: '', value: '' }]);
                setMainFile(null); setGalleryFiles(null);
                fetchProducts();
            }
        } catch (err) {
            alert("Serverfehler!");
        }
    };

    // --- RENDER LOGIN ---
    if (!isAuthenticated) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="bg-neutral-900 p-8 rounded-lg border border-neutral-800 shadow-2xl w-full max-w-md">
                    <h2 className="text-2xl font-bold text-amber-500 mb-6 text-center uppercase tracking-wider">Admin Login</h2>
                    <div className="space-y-4">
                        <input type="text" placeholder="Benutzername" className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded text-white" value={username} onChange={e => setUsername(e.target.value)} required />
                        <input type="password" placeholder="Passwort" className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded text-white" value={password} onChange={e => setPassword(e.target.value)} required />
                        <button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded uppercase transition-all">Anmelden</button>
                    </div>
                </form>
            </div>
        );
    }

    // --- RENDER DASHBOARD ---
    return (
        <div className="max-w-7xl mx-auto mt-10 p-4">
            <div className="flex justify-between items-center mb-8 bg-neutral-900 p-4 rounded border border-neutral-800">
                <h1 className="text-xl font-bold text-amber-500 uppercase">Dashboard</h1>
                <button onClick={handleLogout} className="text-xs bg-neutral-800 text-neutral-400 border border-neutral-700 px-4 py-2 rounded hover:bg-red-600 hover:text-white transition-all uppercase font-bold">Abmelden</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <form onSubmit={handleSubmit} className="p-6 bg-neutral-900 text-white space-y-4 rounded-lg shadow-xl border border-neutral-800 h-fit">
                    <h2 className="text-2xl font-bold text-amber-500 mb-4 uppercase">{editId ? `Edit: ${name}` : "Neues Messer"}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input value={name} placeholder="Name" className="p-2 bg-neutral-800 border border-neutral-700 rounded" onChange={e => setName(e.target.value)} required />
                        <input value={price} placeholder="Preis" type="number" className="p-2 bg-neutral-800 border border-neutral-700 rounded" onChange={e => setPrice(e.target.value)} required />
                        <input value={folderName} placeholder="Ordnername" className="p-2 bg-neutral-800 border border-neutral-700 rounded" onChange={e => setFolderName(e.target.value)} required />
                        <select className="p-2 bg-neutral-800 border border-neutral-700 rounded" value={category} onChange={e => setCategory(e.target.value)}>
                            <option value="Küchenmesser">Küchenmesser</option>
                            <option value="Jagdmesser">Jagdmesser</option>
                            <option value="Outdoor">Outdoor</option>
                            <option value="Klappmesser">Klappmesser</option>
                        </select>
                    </div>
                    <textarea value={desc} placeholder="Kurztext" className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded h-20" onChange={e => setDesc(e.target.value)} />
                    <textarea value={longDesc} placeholder="Langtext" className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded h-32" onChange={e => setLongDesc(e.target.value)} />
                    <input value={features} placeholder="Features (Komma-getrennt)" className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded" onChange={e => setFeatures(e.target.value)} />
                    <div className="bg-neutral-800 p-4 rounded border border-neutral-700">
                        <label className="block mb-2 font-semibold text-amber-400 text-sm">Specs:</label>
                        {specs.map((spec, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input placeholder="Label" className="w-1/2 p-1 bg-neutral-700 rounded text-sm" value={spec.label} onChange={e => updateSpec(index, 'label', e.target.value)} />
                                <input placeholder="Wert" className="w-1/2 p-1 bg-neutral-700 rounded text-sm" value={spec.value} onChange={e => updateSpec(index, 'value', e.target.value)} />
                            </div>
                        ))}
                        <button type="button" onClick={addSpec} className="text-xs bg-neutral-600 px-3 py-1 rounded">+ Zeile</button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="border-2 border-dashed border-amber-600/30 p-4 rounded bg-amber-600/5">
                            <label className="block text-xs font-bold text-amber-500 uppercase mb-2">Hauptbild</label>
                            <input type="file" onChange={e => setMainFile(e.target.files ? e.target.files[0] : null)} className="text-sm w-full" />
                        </div>
                        <div className="border-2 border-dashed border-neutral-700 p-4 rounded bg-neutral-800/50">
                            <label className="block text-xs font-bold text-neutral-400 uppercase mb-2">Galerie</label>
                            <input type="file" multiple onChange={e => setGalleryFiles(e.target.files)} className="text-sm w-full" />
                        </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                        <button type="submit" className="bg-amber-600 hover:bg-amber-500 p-3 flex-1 font-bold uppercase rounded shadow-lg">Speichern</button>
                        {editId && <button type="button" onClick={() => { setEditId(null); setName(''); }} className="bg-neutral-600 p-3 rounded uppercase font-bold">Abbrechen</button>}
                    </div>
                </form>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-neutral-400 uppercase">{showTrash ? "Papierkorb" : "Bestand"}</h2>
                        <button onClick={() => setShowTrash(!showTrash)} className={`text-xs px-4 py-2 rounded font-bold uppercase border ${showTrash ? "bg-amber-600 border-amber-500 text-white" : "bg-neutral-800 text-neutral-400"}`}>
                            {showTrash ? "Zum Bestand" : `Papierkorb (${trash.length})`}
                        </button>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden shadow-2xl">
                        {(showTrash ? trash : products).map(p => (
                            <div key={p.id} className="p-4 border-b border-neutral-800 flex justify-between items-center hover:bg-neutral-800/50 transition-colors">
                                <div>
                                    <p className={`${showTrash ? "text-neutral-500" : "text-amber-500"} font-bold`}>{p.name}</p>
                                    <p className="text-xs text-neutral-500">{p.category} | {p.price}€</p>
                                </div>
                                <div className="flex gap-2">
                                    {showTrash ? (
                                        <>
                                            <button onClick={() => handleRestore(p.id)} className="bg-green-600/20 text-green-400 px-3 py-1 rounded text-xs">Restore</button>
                                            <button onClick={() => handleHardDelete(p.id)} className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold">Löschen</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEdit(p)} className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded text-xs">Edit</button>
                                            <button onClick={() => handleDelete(p.id)} className="bg-red-600/20 text-red-400 px-3 py-1 rounded text-xs">Trash</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};