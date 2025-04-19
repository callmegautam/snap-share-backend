import env from '@/config/env';
import {
    BlobServiceClient,
    StorageSharedKeyCredential,
    generateBlobSASQueryParameters,
    BlobSASPermissions,
} from '@azure/storage-blob';

const accountName = env.AZURE_STORAGE_ACCOUNT_NAME!;
const accountKey = env.AZURE_STORAGE_ACCOUNT_KEY!;
const containerName = env.AZURE_STORAGE_CONTAINER_NAME!;

if (!accountName || !accountKey || !containerName) {
    throw new Error('Azure Storage account info missing');
}

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
);

export async function generateUploadSasUrl(fileName: string, expiresInMinutes = 15): Promise<string> {
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + expiresInMinutes);

    const sasToken = generateBlobSASQueryParameters(
        {
            containerName,
            blobName: fileName,
            permissions: BlobSASPermissions.parse('cwa'), // Create and Write permissions
            expiresOn: expiryDate,
        },
        sharedKeyCredential
    ).toString();

    const sasUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${fileName}?${sasToken}`;
    return sasUrl;
}
