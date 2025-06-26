export default function FileItem({ id, name, type, url, onDelete }) {
    const isImage = type?.startsWith('image')
    const isPDF = type === 'application/pdf'

    return (
        <div className="bg-white shadow rounded-lg p-3 relative hover:shadow-md transition-all">
        {isImage ? (
            <img
            src={url}
            alt={name}
            className="w-full h-40 object-cover rounded mb-2"
            />
        ) : isPDF ? (
            <div className="h-40 flex items-center justify-center bg-gray-100 text-gray-500 rounded mb-2">
            <span className="text-5xl">📄</span>
            </div>
        ) : (
            <div className="h-40 flex items-center justify-center bg-gray-100 text-gray-500 rounded mb-2">
            <span className="text-4xl">📎</span>
            </div>
        )}

        <p className="text-sm font-medium truncate">{name}</p>
        <p className="text-xs text-gray-500">{type}</p>

        <div className="absolute top-2 right-2 space-x-1">
            <a
            href={url}
            target="_blank"
            className="text-blue-600 text-sm hover:underline"
            >
            View
            </a>
            <button
            onClick={() => onDelete(id)}
            className="text-red-600 text-sm hover:underline"
            >
            Delete
            </button>
        </div>
        </div>
    )
}
