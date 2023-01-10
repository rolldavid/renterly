
export interface BookmarkItem {
    street: string;
    city: string;
    state: string;
    slug: string;
    assignedAt: string;
    propertyId: string;
}

export interface BookmarkList {
    isLoggedIn: boolean;
    bookmarks?: BookmarkItem[]
}