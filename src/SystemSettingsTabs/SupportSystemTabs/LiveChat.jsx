import React, { useState, useRef, useEffect } from 'react';
import styles from '../../css/LiveChat.module.css';
import { MessageCircle, Send, Circle, Search, Clock } from 'lucide-react';

// TODO: Real-time via WebSockets
// TODO: Messages fetched from API
// TODO: Persistence pending backend

const LiveChat = () => {
  // Mock chat list data
  const [chats, setChats] = useState([
    {
      id: 1,
      userName: 'Sarah Wilson',
      userEmail: 'sarah.wilson@podermonie.com',
      lastMessage: "I can't login to my account...",
      status: 'Open',
      timestamp: '2 min ago',
      unreadCount: 2,
      isActive: true
    },
    {
      id: 2,
      userName: 'John Smith',
      userEmail: 'john.smith@podermonie.com',
      lastMessage: 'Payment stuck in processing',
      status: 'In Progress',
      timestamp: '15 min ago',
      unreadCount: 0,
      isActive: false
    },
    {
      id: 3,
      userName: 'Emma Davis',
      userEmail: 'emma.davis@podermonie.com',
      lastMessage: 'Need help with investment withdrawal',
      status: 'Open',
      timestamp: '1 hour ago',
      unreadCount: 1,
      isActive: false
    },
    {
      id: 4,
      userName: 'Michael Brown',
      userEmail: 'michael.brown@podermonie.com',
      lastMessage: 'Account verification issue',
      status: 'Resolved',
      timestamp: '2 hours ago',
      unreadCount: 0,
      isActive: false
    }
  ]);

  // Mock messages for selected chat
  const [messages, setMessages] = useState({
    1: [
      { id: 1, from: 'user', text: "I can't login to my account", timestamp: '10:30 AM' },
      { id: 2, from: 'admin', text: "Can you confirm your email address?", timestamp: '10:32 AM' },
      { id: 3, from: 'user', text: 'sarah.wilson@podermonie.com', timestamp: '10:33 AM' },
      { id: 4, from: 'admin', text: 'Thank you. Let me check your account status.', timestamp: '10:35 AM' }
    ],
    2: [
      { id: 1, from: 'user', text: 'Payment stuck in processing', timestamp: '9:15 AM' },
      { id: 2, from: 'admin', text: 'I can help you with that. Can you share the transaction ID?', timestamp: '9:20 AM' }
    ],
    3: [
      { id: 1, from: 'user', text: 'Need help with investment withdrawal', timestamp: '8:00 AM' }
    ],
    4: [
      { id: 1, from: 'user', text: 'Account verification issue', timestamp: '7:00 AM' },
      { id: 2, from: 'admin', text: 'Your account has been verified successfully.', timestamp: '7:30 AM' }
    ]
  });

  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

  // Update selectedChat when chats state changes (for status updates)
  useEffect(() => {
    if (selectedChat) {
      const updatedChat = chats.find(c => c.id === selectedChat.id);
      if (updatedChat) {
        setSelectedChat(updatedChat);
      }
    }
  }, [chats]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, selectedChat]);

  const filteredChats = chats.filter(chat =>
    chat.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;

    const newMessage = {
      id: messages[selectedChat.id]?.length + 1 || 1,
      from: 'admin',
      text: messageInput,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage]
    }));

    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === selectedChat.id
          ? { ...chat, lastMessage: messageInput, timestamp: 'Just now', unreadCount: 0 }
          : chat
      )
    );

    setMessageInput('');
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    // Auto-update to "In Progress" when admin opens chat
    if (chat.status === 'Open') {
      setChats(prevChats =>
        prevChats.map(c =>
          c.id === chat.id ? { ...c, unreadCount: 0, status: 'In Progress' } : { ...c, unreadCount: 0 }
        )
      );
    } else {
      setChats(prevChats =>
        prevChats.map(c =>
          c.id === chat.id ? { ...c, unreadCount: 0 } : c
        )
      );
    }
  };

  const handleStatusChange = (chatId, newStatus) => {
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId ? { ...chat, status: newStatus } : chat
      )
    );
  };
  const getStatusClass = (status) => {
    switch (status) {
      case 'Open':
        return styles.statusOpen;
      case 'In Progress':
        return styles.statusInProgress;
      case 'Resolved':
        return styles.statusResolved;
      default:
        return styles.statusOpen;
    }
  };

  return (
    <div className={styles.liveChatContainer}>
      <div className={styles.chatLayout}>
        <div className={styles.chatListPanel}>
          <div className={styles.chatListHeader}>
            <h2 className={styles.chatListTitle}>
              <MessageCircle size={20} />
              Talk to PoderMonie Agent
            </h2>
            <p className={styles.chatListSubtitle}>In-app live chat for users</p>
          </div>

          <div className={styles.searchContainer}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.chatList}>
            {filteredChats.length === 0 ? (
              <div className={styles.emptyChatList}>
                <p>No chats found</p>
              </div>
            ) : (
              filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`${styles.chatItem} ${selectedChat?.id === chat.id ? styles.chatItemActive : ''}`}
                  onClick={() => handleSelectChat(chat)}
                >
                  <div className={styles.chatItemHeader}>
                    <div className={styles.chatUserInfo}>
                      <div className={styles.chatUserName}>{chat.userName}</div>
                      <div className={styles.chatUserEmail}>{chat.userEmail}</div>
                    </div>
                    {chat.unreadCount > 0 && (
                      <span className={styles.unreadBadge}>{chat.unreadCount}</span>
                    )}
                  </div>
                  <div className={styles.chatItemMessage}>{chat.lastMessage}</div>
                  <div className={styles.chatItemFooter}>
                    <span className={getStatusClass(chat.status)}>{chat.status}</span>
                    <span className={styles.chatTimestamp}>
                      <Clock size={12} />
                      {chat.timestamp}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={styles.chatWindowPanel}>
          {selectedChat ? (
            <>
              <div className={styles.chatHeader}>
                <div className={styles.chatHeaderInfo}>
                  <div className={styles.chatHeaderUser}>
                    <div className={styles.chatHeaderName}>{selectedChat.userName}</div>
                    <div className={styles.chatHeaderEmail}>{selectedChat.userEmail}</div>
                  </div>
                  <div className={styles.chatHeaderStatus}>
                    {selectedChat.isActive ? (
                      <span className={styles.onlineStatus}>
                        <Circle size={10} fill="currentColor" />
                        Online
                      </span>
                    ) : (
                      <span className={styles.offlineStatus}>
                        <Circle size={10} fill="currentColor" />
                        Offline
                      </span>
                    )}
                  </div>
                </div>
                <div className={styles.chatHeaderActions}>
                  <select
                    value={selectedChat.status}
                    onChange={(e) => {
                      // Only allow changing to Resolved
                      if (e.target.value === 'Resolved') {
                        handleStatusChange(selectedChat.id, 'Resolved');
                      }
                    }}
                    className={styles.statusSelect}
                  >
                    {selectedChat.status === 'In Progress' && (
                      <option value="In Progress">In Progress</option>
                    )}
                    {selectedChat.status === 'Open' && (
                      <option value="Open">Open</option>
                    )}
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>

              <div className={styles.messagesArea}>
                {messages[selectedChat.id]?.map((message) => (
                  <div
                    key={message.id}
                    className={`${styles.message} ${message.from === 'admin' ? styles.messageAdmin : styles.messageUser}`}
                  >
                    <div className={styles.messageBubble}>
                      <div className={styles.messageText}>{message.text}</div>
                      <div className={styles.messageTimestamp}>{message.timestamp}</div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className={styles.inputArea}>
                <textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  className={styles.messageInput}
                  rows={3}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className={styles.sendButton}
                >
                  <Send size={18} />
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <MessageCircle size={64} className={styles.emptyStateIcon} />
              <h3 className={styles.emptyStateTitle}>No chat selected</h3>
              <p className={styles.emptyStateText}>
                Select a chat from the list to start conversation
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
