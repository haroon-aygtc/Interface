import React from 'react';
import SelectorGroupManager from './SelectorGroupManager';

// Define the types needed for the component
interface Selector {
  id: string;
  name: string;
  cssPath: string;
  xPath?: string;
  description?: string;
}

interface SelectorGroup {
  id: string;
  name: string;
  domain: string;
  pageType: string;
  selectors: Selector[];
}

// Mock data for testing
const mockSelectorGroups: SelectorGroup[] = [
  {
    id: "sg1",
    name: "Documentation Pages",
    domain: "example.com",
    pageType: "documentation",
    selectors: [
      {
        id: "s1",
        name: "Main Content",
        cssPath: "#main-content",
        xPath: "//*[@id='main-content']",
        description: "Main content area of documentation pages",
      },
      {
        id: "s2",
        name: "Article Title",
        cssPath: ".article-title",
        xPath: "//h1[@class='article-title']",
        description: "Title of the documentation article",
      },
    ],
  },
  {
    id: "sg2",
    name: "Blog Posts",
    domain: "blog.example.com",
    pageType: "blog",
    selectors: [
      {
        id: "s3",
        name: "Post Title",
        cssPath: "h1.post-title",
        description: "Title of the blog post",
      },
      {
        id: "s4",
        name: "Post Content",
        cssPath: ".post-content",
        description: "Main content of the blog post",
      },
      {
        id: "s5",
        name: "Author Info",
        cssPath: ".author-bio",
        description: "Author information section",
      },
    ],
  },
];

// Mock implementation of the SelectorGroupManager for testing
const MockSelectorGroupManager: React.FC = () => {
  // Mock handlers
  const handleCreateGroup = (group: Omit<SelectorGroup, "id" | "selectors">) => {
    console.log('Create group:', group);
  };

  const handleUpdateGroup = (group: SelectorGroup) => {
    console.log('Update group:', group);
  };

  const handleDeleteGroup = (groupId: string) => {
    console.log('Delete group:', groupId);
  };

  const handleCreateSelector = (selector: Omit<Selector, "id">, groupId: string) => {
    console.log('Create selector:', selector, 'in group:', groupId);
  };

  const handleUpdateSelector = (selector: Selector, groupId: string) => {
    console.log('Update selector:', selector, 'in group:', groupId);
  };

  const handleDeleteSelector = (selectorId: string, groupId: string) => {
    console.log('Delete selector:', selectorId, 'from group:', groupId);
  };

  return (
    <SelectorGroupManager
      selectorGroups={mockSelectorGroups}
      onCreateGroup={handleCreateGroup}
      onUpdateGroup={handleUpdateGroup}
      onDeleteGroup={handleDeleteGroup}
      onCreateSelector={handleCreateSelector}
      onUpdateSelector={handleUpdateSelector}
      onDeleteSelector={handleDeleteSelector}
    />
  );
};

export default MockSelectorGroupManager;
