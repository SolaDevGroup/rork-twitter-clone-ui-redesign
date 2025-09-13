import createContextHook from '@nkzw/create-context-hook';
import { useState, useCallback, useMemo } from 'react';
import { currentUser } from '@/mocks/data';
import { User, Collection, Post } from '@/types';

export const [AuthProvider, useAuth] = createContextHook(() => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([
    {
      id: '1',
      name: 'Saved Posts',
      posts: [],
      isPublic: false,
      createdAt: new Date().toISOString(),
    },
  ]);

  const login = useCallback(() => {
    setUser(currentUser);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const addCollection = useCallback((name: string, isPublic: boolean) => {
    const newCollection: Collection = {
      id: Date.now().toString(),
      name,
      posts: [],
      isPublic,
      createdAt: new Date().toISOString(),
    };
    setCollections(prev => [...prev, newCollection]);
  }, []);

  const addToCollection = useCallback((collectionId: string, post: Post) => {
    setCollections(prev => prev.map(collection => 
      collection.id === collectionId 
        ? { ...collection, posts: [...collection.posts, post] }
        : collection
    ));
  }, []);

  const removeFromCollection = useCallback((collectionId: string, postId: string) => {
    setCollections(prev => prev.map(collection => 
      collection.id === collectionId 
        ? { ...collection, posts: collection.posts.filter(post => post.id !== postId) }
        : collection
    ));
  }, []);

  return useMemo(() => ({
    user,
    isAuthenticated,
    login,
    logout,
    collections,
    addCollection,
    addToCollection,
    removeFromCollection,
  }), [user, isAuthenticated, login, logout, collections, addCollection, addToCollection, removeFromCollection]);
});