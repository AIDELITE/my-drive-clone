import Breadcrumbs from '@/components/Breadcrumbs'

export default function FolderPage({ params }) {
    const folderNameMap = {
        [params.folderId]: 'Projects',
    }

    return (
        <div className="p-6">
        <Breadcrumbs folderNameMap={folderNameMap} />
        </div>
    )
}
