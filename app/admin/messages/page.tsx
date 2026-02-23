'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Mail, Trash2, Loader2, Check, Clock } from 'lucide-react'
import { format } from 'date-fns'

interface Message {
  id: string
  name: string
  email: string
  message: string
  is_read: boolean
  created_at: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  async function fetchMessages() {
    try {
      const response = await fetch('/api/messages')
      if (!response.ok) {
        throw new Error('Failed to fetch messages')
      }
      
      const messages = await response.json()
      setMessages(messages)
    } catch (error) {
      console.log('[v0] Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  async function markAsRead(id: string) {
    try {
      const response = await fetch('/api/messages', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          is_read: true
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update message')
      }
      
      fetchMessages()
    } catch (error) {
      toast.error('Failed to update message')
    }
  }

  async function deleteMessage(id: string) {
    if (!confirm('Are you sure you want to delete this message?')) return

    try {
      const response = await fetch(`/api/messages?id=${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete message')
      }
      
      toast.success('Message deleted')
      setSelectedMessage(null)
      fetchMessages()
    } catch (error) {
      toast.error('Failed to delete message')
    }
  }

  function handleSelectMessage(message: Message) {
    setSelectedMessage(message)
    if (!message.is_read) {
      markAsRead(message.id)
    }
  }

  const unreadCount = messages.filter(m => !m.is_read).length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif text-[oklch(1_0_0)]">Messages</h1>
        <p className="text-[oklch(0.6_0_0)] mt-1">
          {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All messages read'}
        </p>
      </div>

      {/* Messages Layout */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[oklch(0.78_0.12_85)]" />
        </div>
      ) : messages.length === 0 ? (
        <Card className="bg-[oklch(0.1_0_0)] border-[oklch(0.15_0_0)]">
          <CardContent className="py-12 text-center">
            <Mail className="w-12 h-12 mx-auto text-[oklch(0.3_0_0)] mb-4" />
            <p className="text-[oklch(0.6_0_0)]">No messages yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1 space-y-2">
            {messages.map((message) => (
              <button
                key={message.id}
                type="button"
                onClick={() => handleSelectMessage(message)}
                className={`w-full text-left p-4 rounded-lg transition-colors ${
                  selectedMessage?.id === message.id
                    ? 'bg-[oklch(0.78_0.12_85)]/10 border border-[oklch(0.78_0.12_85)]'
                    : 'bg-[oklch(0.1_0_0)] border border-[oklch(0.15_0_0)] hover:bg-[oklch(0.12_0_0)]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {!message.is_read && (
                        <div className="w-2 h-2 rounded-full bg-[oklch(0.78_0.12_85)]" />
                      )}
                      <h3 className={`font-medium truncate ${message.is_read ? 'text-[oklch(0.8_0_0)]' : 'text-[oklch(1_0_0)]'}`}>
                        {message.name}
                      </h3>
                    </div>
                    <p className="text-sm text-[oklch(0.5_0_0)] truncate mt-1">
                      {message.message}
                    </p>
                  </div>
                  <span className="text-xs text-[oklch(0.4_0_0)] whitespace-nowrap">
                    {format(new Date(message.created_at), 'MMM d')}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <Card className="bg-[oklch(0.1_0_0)] border-[oklch(0.15_0_0)]">
                <CardContent className="p-6 space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-serif text-[oklch(1_0_0)]">
                        {selectedMessage.name}
                      </h2>
                      <a 
                        href={`mailto:${selectedMessage.email}`}
                        className="text-[oklch(0.78_0.12_85)] hover:underline text-sm"
                      >
                        {selectedMessage.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[oklch(0.5_0_0)] flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {format(new Date(selectedMessage.created_at), 'MMM d, yyyy h:mm a')}
                      </span>
                    </div>
                  </div>

                  {/* Message Body */}
                  <div className="bg-[oklch(0.08_0_0)] rounded-lg p-4">
                    <p className="text-[oklch(0.9_0_0)] whitespace-pre-wrap leading-relaxed">
                      {selectedMessage.message}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      asChild
                      className="bg-[oklch(0.78_0.12_85)] text-[oklch(0.08_0_0)] hover:bg-[oklch(0.88_0.08_85)]"
                    >
                      <a href={`mailto:${selectedMessage.email}`}>
                        <Mail className="w-4 h-4 mr-2" />
                        Reply
                      </a>
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => deleteMessage(selectedMessage.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-[oklch(0.1_0_0)] border-[oklch(0.15_0_0)]">
                <CardContent className="py-12 text-center">
                  <Mail className="w-12 h-12 mx-auto text-[oklch(0.3_0_0)] mb-4" />
                  <p className="text-[oklch(0.6_0_0)]">Select a message to view</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
