import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AdminInbox = () => {
  const [messages, setMessages] = useState([])
  const [filter, setFilter] = useState('pending')

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/contact')
      setMessages(res.data)
    } catch (err) {
      console.error('Failed to fetch messages', err)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleStatusUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/contact/${id}/status`, { status: 'contacted' })
      fetchMessages() // refresh list
    } catch (err) {
      console.error("Couldn't update status", err)
    }
  }

  const filteredMessages = messages.filter(msg => msg.status === filter)

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Inbox</h1>

      <div className="mb-4">
        <button
          className={`mr-4 px-4 py-2 rounded ${filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === 'contacted' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('contacted')}
        >
          Contacted
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-220">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Message</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">No messages found</td>
              </tr>
            ) : (
              filteredMessages.map(msg => (
                <tr key={msg._id} className="border-t">
                  <td className="px-6 py-4">{msg.name}</td>
                  <td className="px-6 py-4">{msg.email}</td>
                  <td className="px-6 py-4">{msg.message}</td>
                  <td className="px-6 py-4 capitalize">{msg.status}</td>
                  <td className="px-6 py-4">
                    {msg.status === 'pending' && (
                      <button
                        onClick={() => handleStatusUpdate(msg._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Mark as Contacted
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminInbox
