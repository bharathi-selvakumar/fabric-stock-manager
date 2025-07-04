import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [fabrics, setFabrics] = useState([]);
  const [form, setForm] = useState({
    fabricId: '', name: '', quantity: '', pricePerMeter: '', color: '', supplier: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchFabrics = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/fabrics');
      setFabrics(res.data);
    } catch (err) {
      alert('Error fetching data');
    }
  };

  useEffect(() => { fetchFabrics(); }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:3001/api/fabrics/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post('http://localhost:3001/api/fabrics', form);
      }
      fetchFabrics();
      setForm({ fabricId: '', name: '', quantity: '', pricePerMeter: '', color: '', supplier: '' });
    } catch (err) {
      alert('Error submitting data');
    }
  };

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this fabric?')) {
      await axios.delete(`http://localhost:3001/api/fabrics/${id}`);
      fetchFabrics();
    }
  };

  const handleEdit = fabric => {
    setForm(fabric);
    setEditingId(fabric.fabricId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-8 animate-fade-in-up">
        <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-8 animate-pulse">Tailoring Fabric Inventory</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
          {['fabricId', 'name', 'quantity', 'pricePerMeter', 'color', 'supplier'].map(field => (
            <div key={field} className="flex flex-col animate-fade-in">
              <label className="text-sm font-medium text-gray-600 mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-transform duration-200 ease-in-out hover:scale-105"
                placeholder={`Enter ${field}`}
              />
            </div>
          ))}
          <button
            type="submit"
            className="sm:col-span-2 md:col-span-3 py-2 mt-4 bg-green-500 hover:bg-cyan-500 text-white text-lg rounded-xl transition-transform transform hover:scale-105 duration-300"
          >
            {editingId ? 'Update' : 'Add'} Fabric
          </button>
        </form>

        <div className="overflow-x-auto animate-fade-in rounded-2xl">
          <table className="min-w-full border text-sm text-center">
            <thead>
              <tr className="bg-blue-300 text-white ">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Qty</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Color</th>
                <th className="p-3 border">Supplier</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fabrics.map(f => (
                <tr key={f.fabricId} className="even:bg-indigo-50 transition duration-200 hover:bg-indigo-100">
                  <td className="p-2 border">{f.fabricId}</td>
                  <td className="p-2 border">{f.name}</td>
                  <td className="p-2 border">{f.quantity}</td>
                  <td className="p-2 border">₹{f.pricePerMeter}</td>
                  <td className="p-2 border">{f.color}</td>
                  <td className="p-2 border">{f.supplier}</td>
                  <td className="p-2 border">
                    <button
                      className="px-3 py-1 mr-2 bg-yellow-400 hover:bg-yellow-500 rounded shadow text-sm transform hover:scale-105 transition"
                      onClick={() => handleEdit(f)}
                    >Edit</button>
                    <button
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded shadow text-sm transform hover:scale-105 transition"
                      onClick={() => handleDelete(f.fabricId)}
                    >Delete</button>
                  </td>
                </tr>
              ))}
              {fabrics.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-4 text-gray-500 animate-fade-in">No fabric records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;