import { Icon } from '@fluentui/react/lib/Icon';
import { getFileTypeIconProps, initializeFileTypeIcons } from '@fluentui/react-file-type-icons';

const SourceBrowser = ({ files }) => {
    initializeFileTypeIcons();
    
    if (files.type === 'file') {
        return (
            <>
            
            <h5 className="file-name"><Icon {...getFileTypeIconProps({ extension: 'json', size: 16, imageFileType: "png" })} />{files.name}</h5>
            </>
        )
    }

    return (
        <div className = "folder">

            <h4 className="folder-title">{files.name}</h4>
            {
                files.items.map((item) => <SourceBrowser files={item} />)
            }
        </div>
    )
}

export default SourceBrowser;