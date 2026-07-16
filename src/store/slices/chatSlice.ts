import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conversation, Message } from '../../types';

interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: Record<string, Message[]>; // Map conversationId to Message array
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  conversations: [],
  activeConversationId: null,
  messages: {},
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload;
      state.loading = false;
      state.error = null;
    },
    setActiveConversation: (state, action: PayloadAction<string | null>) => {
      state.activeConversationId = action.payload;
      if (action.payload) {
        const conv = state.conversations.find((c) => c.id === action.payload);
        if (conv) {
          conv.unreadCount = 0;
        }
      }
    },
    setMessages: (
      state,
      action: PayloadAction<{ conversationId: string; messages: Message[] }>
    ) => {
      state.messages[action.payload.conversationId] = action.payload.messages;
      state.loading = false;
      state.error = null;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      const { conversationId } = action.payload;
      if (!state.messages[conversationId]) {
        state.messages[conversationId] = [];
      }
      state.messages[conversationId].push(action.payload);

      // Update last message in conversation preview
      const conv = state.conversations.find((c) => c.id === conversationId);
      if (conv) {
        conv.lastMessage = action.payload.content;
        conv.lastMessageAt = action.payload.createdAt;
        if (state.activeConversationId !== conversationId) {
          conv.unreadCount += 1;
        }
      }

      // Re-order conversations list to show newest on top
      state.conversations.sort((a, b) => {
        const dateA = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
        const dateB = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
        return dateB - dateA;
      });
    },
    setChatLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setChatError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setConversations,
  setActiveConversation,
  setMessages,
  addMessage,
  setChatLoading,
  setChatError,
} = chatSlice.actions;
export default chatSlice.reducer;
