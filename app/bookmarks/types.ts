
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

// mutating bookmark
export interface BookmarkProps {
    propertyId: string
    type: "add" | "remove"
}