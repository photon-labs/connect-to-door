//
//  ctdBaseViewController.m
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/6/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdBaseViewController.h"
#import "ctdLoginViewController.h"
#import "ctdAppDelegate.h"
#import "UIViewController+MJPopupViewController.h"
#import "MBProgressHUD.h"
#import <QuartzCore/QuartzCore.h>

@interface ctdBaseViewController ()

@end

@implementation ctdBaseViewController

@synthesize hasSignoutButton = _hasSignoutButton;
@synthesize hasBackButton = _hasBackButton;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        UIImage* image = [UIImage imageNamed:@"background_allpages.png"];
        [self.view setBackgroundColor:[UIColor colorWithPatternImage: [self imageWithImage:image scaledToSize:CGSizeMake(1024,748)]]];
        
        
        UIImage *btnImage = [UIImage imageNamed:@"button_sign-out.png"];
        signoutButton = [UIButton buttonWithType:UIButtonTypeCustom];
        [signoutButton setImage:btnImage forState:UIControlStateNormal];
        signoutButton.frame = CGRectMake(851, 624, btnImage.size.width, btnImage.size.height);
        [signoutButton addTarget:self
                   action:@selector(signOut)
         forControlEvents:UIControlEventTouchDown];
        [self.view addSubview:signoutButton];
        
        UIImage *backButtonImage = [UIImage imageNamed:@"button_back.png"];
        backButton = [UIButton buttonWithType:UIButtonTypeCustom];
        [backButton setImage:backButtonImage forState:UIControlStateNormal];
        backButton.frame = CGRectMake(40, 624, backButtonImage.size.width, backButtonImage.size.height);
        [backButton addTarget:self
                          action:@selector(goBack)
                forControlEvents:UIControlEventTouchDown];
        [self.view addSubview:backButton];
    }
    return self;
}


- (void)signOut{
    NSLog(@"sign out button clicked");
    ctdLoginViewController *loginViewController = [[ctdLoginViewController alloc]initWithNibName:@"ctdLoginViewController" bundle:nil];
    loginViewController.hasSignoutButton = NO;
    
    ctdAppDelegate *appDelegate = [[UIApplication sharedApplication]delegate];
    [self.navigationController pushViewController:loginViewController animated:YES];
    [appDelegate.session closeAndClearTokenInformation];
}

- (UIImage *)imageWithImage:(UIImage *)image scaledToSize:(CGSize)newSize {
    //UIGraphicsBeginImageContext(newSize);
    UIGraphicsBeginImageContextWithOptions(newSize, NO, 0.0);
    [image drawInRect:CGRectMake(0, 0, newSize.width, newSize.height)];
    UIImage *newImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return newImage;
}

- (void)setHasSignoutButton:(BOOL)hasSignoutButton {
	_hasSignoutButton = hasSignoutButton;
	signoutButton.alpha = (_hasSignoutButton == YES) ? 1.0 :0.0;
}

- (void)setHasBackButton:(BOOL)hasBackButton {
	_hasBackButton = hasBackButton;
	backButton.alpha = (_hasBackButton == YES) ? 1.0 :0.0;
}

- (void)goBack{
    [self.navigationController popViewControllerAnimated:YES];
}

-(void)viewWillAppear:(BOOL)animated{
    [self.navigationController setNavigationBarHidden:YES animated:YES];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
  
    // Do any additional setup after loading the view from its nib.
}

- (void)showAlert:(typeAlert)type{
    
    alertView = [[ctdAlertViewController alloc]initViewController:type andDelegate:self];
    [self presentPopupViewController:alertView animationType:MJPopupViewAnimationFade isBackgroundClickable:NO];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma Alert View Delegate

- (void)dismissAlert{
    [self dismissPopupViewControllerWithanimationType:MJPopupViewAnimationFade];
    
    [self invalidateAlertView];
}

- (void)invalidateAlertView{
    if(alertView){
        alertView.delegate = nil;
        [alertView invalidate];
        alertView  = nil;
    }
}

- (void)showActivityIndicator {
	MBProgressHUD  *hud = [MBProgressHUD showHUDAddedTo:self.view animated:YES];
    hud.layer.zPosition = 1;
	hud.mode = MBProgressHUDModeIndeterminate;
}

- (void)hideActivityIndicator {
	[MBProgressHUD hideHUDForView:self.view animated:YES];
}

@end
