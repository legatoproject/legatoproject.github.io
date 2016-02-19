set -ex
echo "Cleaning..."
rm -rf out/*
echo "Running templater..."
python gen.py
echo "Copying..."
cp -R out/* ../
