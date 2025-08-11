import { createSlice } from "@reduxjs/toolkit";

// Load chat history from localStorage
const loadChatFromStorage = () => {
  try {
    const savedChats = localStorage.getItem('devnexus_chat_history');
    return savedChats ? JSON.parse(savedChats) : {};
  } catch (error) {
    console.error('Error loading chat history:', error);
    return {};
  }
};

// Save chat history to localStorage
const saveChatToStorage = (conversations) => {
  try {
    localStorage.setItem('devnexus_chat_history', JSON.stringify(conversations));
  } catch (error) {
    console.error('Error saving chat history:', error);
  }
};

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: loadChatFromStorage(), // Load from localStorage
    activeChat: null,
  },
  reducers: {
    addMessage: (state, action) => {
      const { userId, message } = action.payload;
      if (!state.conversations[userId]) {
        state.conversations[userId] = [];
      }
      state.conversations[userId].push(message);
      // Save to localStorage after adding message
      saveChatToStorage(state.conversations);
    },
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
    clearActiveChat: (state) => {
      state.activeChat = null;
    },
    clearConversation: (state, action) => {
      const userId = action.payload;
      if (state.conversations[userId]) {
        state.conversations[userId] = [];
        // Save to localStorage after clearing
        saveChatToStorage(state.conversations);
      }
    },
    initializeConversation: (state, action) => {
      const { userId, messages } = action.payload;
      if (!state.conversations[userId]) {
        state.conversations[userId] = messages || [];
        // Save to localStorage after initializing
        saveChatToStorage(state.conversations);
      }
    }
  }
});

export const { 
  addMessage, 
  setActiveChat, 
  clearActiveChat, 
  clearConversation, 
  initializeConversation 
} = chatSlice.actions;

export default chatSlice.reducer;
