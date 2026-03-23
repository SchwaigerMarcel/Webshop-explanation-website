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
}

export const AdminDashboard = () => {
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
    const [files, setFiles] = useState<FileList | null>(null);

    // Produktliste-State
    const [products, setProducts] = useState<Product[]>([]);

    const API_BASE = 'https://messerschmiede-schwaiger.at/api';

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch(`${API_BASE}/products`);
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error("Fehler beim Laden der Liste:", err);
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
        if (!confirm("Messer wirklich löschen? Das löscht auch alle Bilder auf dem Server!")) return;
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${API_BASE}/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                alert("Messer gelöscht!");
                fetchProducts();
            }
        } catch (err) {
            alert("Fehler beim Löschen");
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
        formData.append('price', price);
        formData.append('description', desc);
        formData.append('long_description', longDesc);
        formData.append('image', folderName);

        const featuresArray = features.split(',').map(f => f.trim()).filter(f => f !== "");
        formData.append('features', JSON.stringify(featuresArray));
        formData.append('specifications', JSON.stringify(specs));

        if (files) {
            Array.from(files).forEach(file => formData.append('images', file));
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
                alert(editId ? "Messer aktualisiert!" : "Messer geschmiedet!");
                setEditId(null);
                // Reset Form
                setName(''); setPrice(''); setFolderName(''); setDesc(''); setLongDesc(''); setFeatures('');
                setSpecs([{ label: '', value: '' }]);
                fetchProducts();
            } else {
                const errData = await response.json();
                alert("Fehler: " + errData.error);
            }
        } catch (err) {
            alert("Serverfehler!");
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                {/* FORMULAR SEITE */}
                <form onSubmit={handleSubmit} className="p-6 bg-neutral-900 text-white space-y-4 rounded-lg shadow-xl border border-neutral-800 h-fit">
                    <h2 className="text-2xl font-bold text-amber-500 mb-4 uppercase">
                        {editId ? `Messer ID: ${editId} bearbeiten` : "Neues Messer Schmieden"}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input value={name} placeholder="Messer Name" className="p-2 bg-neutral-800 border border-neutral-700 rounded" onChange={e => setName(e.target.value)} required />
                        <input value={price} placeholder="Preis (€)" type="number" className="p-2 bg-neutral-800 border border-neutral-700 rounded" onChange={e => setPrice(e.target.value)} required />
                        <input value={folderName} placeholder="Ordnername (z.B. amber-outdoor)" className="p-2 bg-neutral-800 border border-neutral-700 rounded" onChange={e => setFolderName(e.target.value)} required />
                        <select className="p-2 bg-neutral-800 border border-neutral-700 rounded" value={category} onChange={e => setCategory(e.target.value)}>
                            <option value="Küchenmesser">Küchenmesser</option>
                            <option value="Jagdmesser">Jagdmesser</option>
                            <option value="Outdoor">Outdoor</option>
                            <option value="Klappmesser">Klappmesser</option>
                        </select>
                    </div>

                    <textarea value={desc} placeholder="Kurzbeschreibung" className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded h-20" onChange={e => setDesc(e.target.value)} />
                    <textarea value={longDesc} placeholder="Lange Beschreibung" className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded h-32" onChange={e => setLongDesc(e.target.value)} />
                    <input value={features} placeholder="Features (Rostfrei, Damast ...)" className="w-full p-2 bg-neutral-800 border border-neutral-700 rounded" onChange={e => setFeatures(e.target.value)} />

                    <div className="bg-neutral-800 p-4 rounded border border-neutral-700">
                        <label className="block mb-2 font-semibold text-amber-400 text-sm">Spezifikationen:</label>
                        {specs.map((spec, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input placeholder="z.B. Härte" className="w-1/2 p-1 bg-neutral-700 rounded text-sm" value={spec.label} onChange={e => updateSpec(index, 'label', e.target.value)} />
                                <input placeholder="z.B. 60 HRC" className="w-1/2 p-1 bg-neutral-700 rounded text-sm" value={spec.value} onChange={e => updateSpec(index, 'value', e.target.value)} />
                            </div>
                        ))}
                        <button type="button" onClick={addSpec} className="text-xs bg-neutral-600 hover:bg-neutral-500 px-3 py-1 rounded">+ Zeile</button>
                    </div>

                    <div className="border-2 border-dashed border-neutral-700 p-4 rounded text-center">
                        <input type="file" multiple onChange={e => setFiles(e.target.files)} className="text-sm text-neutral-400 file:bg-amber-600 file:text-white file:border-0 file:rounded file:px-4 file:py-1 file:mr-4 cursor-pointer" />
                        <p className="text-[10px] text-neutral-500 mt-2">Hinweis: Hochladen überschreibt/ergänzt Bilder im Ordner.</p>
                    </div>

                    <div className="flex gap-2">
                        <button type="submit" className="bg-amber-600 hover:bg-amber-500 p-3 flex-1 font-bold uppercase rounded shadow-lg transition-all">
                            {editId ? "Änderungen Speichern" : "In Datenbank Speichern"}
                        </button>
                        {editId && (
                            <button type="button" onClick={() => { setEditId(null); setName(''); }} className="bg-neutral-600 p-3 rounded uppercase font-bold">Abbrechen</button>
                        )}
                    </div>
                </form>

                {/* LISTE SEITE */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-neutral-400 uppercase">Aktueller Bestand</h2>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
                        {products.map(p => (
                            <div key={p.id} className="p-4 border-b border-neutral-800 flex justify-between items-center hover:bg-neutral-800 transition-colors">
                                <div>
                                    <p className="text-amber-500 font-bold">{p.name}</p>
                                    <p className="text-xs text-neutral-500">{p.category} | {p.price}€ | Ordner: {p.image}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(p)} className="bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white px-3 py-1 rounded text-xs transition-all">Edit</button>
                                    <button onClick={() => handleDelete(p.id)} className="bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white px-3 py-1 rounded text-xs transition-all">Löschen</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};